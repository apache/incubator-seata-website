---
title: 运维指南
keywords: Seata
description: Seata支持在TC开启Metrics数据采集并输出到Prometheus监控系统中。
---

# Prometheus Metrics 配置指南
Seata支持在TC开启Metrics数据采集并输出到Prometheus监控系统中。

### 在TC中配置开启Metrics
#### 步骤一：打开 TC 中 Metrics 的配置项

Seata Server 已经包含了 metrics(seata-metrics-all)依赖, 但是默认是关闭状态，需要开启 metrics 的采集配置。

```yml
seata:
  metrics:
    enabled: true
    registry-type: compact
    exporter-list: prometheus
    exporter-prometheus-port: 9898

```

输入`http://tc-server-ip:9898/metrics`，即可获得最新的Metrics数据，例如：
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

得到以上类似数据证明mertric开启成功。

>提示：
>1. 如果某些Transaction状态没有发生，例如rollback，那么对应的Metrics指标也不会存在（输出）。

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

![tc-prometheus](https://img.alicdn.com/imgextra/i2/O1CN01r6916n1DiXhwH07dj_!!6000000000250-2-tps-1698-959.png)

推荐在Prometheus中结合配置[Grafana](https://prometheus.io/docs/visualization/grafana/)获得更好的查询效果：

![tc-grafana](https://img.alicdn.com/imgextra/i2/O1CN01IdJk5G25B62KpD5If_!!6000000007487-2-tps-1694-973.png)

>提示：此配置是将Prometheus作为Grafana的数据源，因此数据完全相同，只是使用Grafana显示效果更佳。
