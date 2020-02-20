---
title: 运维指南
keywords: Seata
description: Seata支持在TC、TM和RM三个角色开启Metrics数据采集并输出到Prometheus监控系统中。
---

# 运维指南
## Metrics配置指南
Seata支持在TC、TM和RM三个角色开启Metrics数据采集并输出到Prometheus监控系统中。
### 在TC中配置开启Metrics
#### 步骤一：在Seata Server中增加Metrics的依赖并重新编译Server
打开Seata Server源代码的[pom](https://github.com/seata/seata/blob/develop/server/pom.xml)，添加Metrics依赖：

```xml
<dependency>
	<groupId>${project.groupId}</groupId>
	<artifactId>seata-metrics-prometheus</artifactId>
</dependency>
```

重新编译Server，启动，输入`http://tc-server-ip:9898/metrics`，即可获得最新的Metrics数据，例如：
```
# HELP seata seata
# TYPE seata untyped
seata_transaction{meter="counter",role="tc",status="committed",} 1358.0 1551946035372
seata_transaction{meter="counter",role="tc",status="active",} 0.0 1551946035372
seata_transaction{meter="summary",role="tc",statistic="count",status="committed",} 6.0 1551946035372
seata_transaction{meter="summary",role="tc",statistic="total",status="committed",} 6.0 1551946035372
seata_transaction{meter="summary",role="tc",statistic="tps",status="committed",} 1.6163793103448276 1551946035372
seata_transaction{meter="timer",role="tc",statistic="count",status="committed",} 6.0 1551946035372
seata_transaction{meter="timer",role="tc",statistic="total",status="committed",} 910.0 1551946035372
seata_transaction{meter="timer",role="tc",statistic="max",status="committed",} 164.0 1551946035372
seata_transaction{meter="timer",role="tc",statistic="average",status="committed",} 151.66666666666666 1551946035372
```

>提示：
>1. 目前我们使用的Prometheus数据发布端口固定为9898，未来会将其修改为可配置项，请确保此端口不会被占用；
>2. 如果某些Transaction状态没有发生，例如rollback，那么对应的Metrics指标也不会存在（输出）。

#### 步骤二：修改Prometheus配置文件并启动Prometheus
打开Prometheus的配置文件`prometheus.yml`，在`scrape_configs`中增加一项抓取Seata TC的Metrics数据：

```yaml
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
    - targets: ['localhost:9090']

  - job_name: 'seata'

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
    - targets: ['tc-server-ip:9898']
```

#### 步骤三：在Prometheus UI或Grafana中查看Seata TC的Metrics
在浏览器中打开Prometheus UI`http://localhost:9090/graph`，选择`seata_transaction`，点击查询，即可获取到最新数据：

![tc-prometheus](/img/tc-prometheus.png)

推荐在Prometheus中结合配置[Grafana](https://prometheus.io/docs/visualization/grafana/)获得更好的查询效果：

![tc-grafana](/img/tc-grafana.png)

>提示：此配置是将Prometheus作为Grafana的数据源，因此数据完全相同，只是使用Grafana显示效果更佳。
