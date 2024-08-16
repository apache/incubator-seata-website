---
title: Metrics Design
keywords: [Seata, Metrics]
description: Seata Metrics
---

### Metrics

#### Design Philosophy

1. Seata, as an integrated data consistency framework, will minimize the use of third-party dependencies to reduce the risk of conflicts in the Metrics module.
2. The Metrics module will strive for higher measurement performance and lower resource overhead, minimizing side effects when enabled.
3. When configuring, whether Metrics is activated and how data are published depend on the corresponding configuration; enabling configuration will automatically activate Metrics and publish measurement data to [Prometheus](https://github.com/prometheus).
4. Using Service Provider Interface (SPI) for loading extensions instead of Spring.
5. Initially, only core Transaction-related metrics will be published, and all other operational metrics will be gradually improved based on community needs.

#### Module Description

It consists of two core API modules, `seata-metrics-api` and `seata-metrics-core`, as well as N implementation modules such as `seata-metrics-registry-compact` and `seata-metrics-exporter-prometheus`:

- seata-metrics-api Module

This module is the core of Metrics and is part of the Seata infrastructure, referenced by TC, TM, and RM. It **does not contain any specific implementation code**, but it only includes interface definitions, including:

1. Meter class interfaces: `Gauge`, `Counter`, `Timer`, etc.
2. Registry container interface `Registry`
3. Measurement publishing interface `Publisher`

> Note: There are many existing implementations of Metrics in the open-source community, such as
>
> 1. [Netflix-Spectator](https://github.com/Netflix/spectator)
> 2. [Dropwizard-Metrics](https://github.com/dropwizard/metrics)
> 3. [Dubbo-Metrics](https://github.com/dubbo/dubbo-metrics)
>    Some of them are lightweight and agile, while others are heavy and powerful. Since they are also "implementations", they will not be included in `seata-metrics-api` to avoid implementation binding.

- seata-metrics-core Module

This core module of Metrics organizes (loads) one Registry and N Exporters based on configuration.

- seata-metrics-registry-compact Module

This is the default (built-in) Registry implementation we provide.Instead of using other open-source Metrics libraries, it provides lightweight implementations of four types of Meters:

- seata-metrics-exporter-prometheus Module

This is the default Metrics implementation we provide. Without using other open-source Metrics implementations, it provides lightweight implementations of three types of Meters:

| Meter Type | Description                                                                                                           |
| ---------- | --------------------------------------------------------------------------------------------------------------------- |
| Gauge      | Single latest value meter                                                                                             |
| Counter    | Single accumulating meter, can increase or decrease                                                                   |
| Summary    | Multi-measurement output counter, outputs `total`, `count`, and `tps` (total per second) with no units                |
| Timer      | Multi-measurement output timer, outputs `total`, `count`, `max`, and `average`, supports accumulation in microseconds |

> Note:
>
> 1. More complex meters such as Histogram may be added in the future. Histogram is a type of meter that locally aggregates 75th, 90th, 95th, 98th, 99th, 99.9th, etc., and is suitable for certain scenarios but requires more memory.
> 2. All meters inherit from Meter, and after executing the measure() method, all meters will generate 1 or N normalized Measurement results.

It also implements an in-memory Registry and Prometheus Exporter to synchronize measurement data with Prometheus.

> Note: Different monitoring systems have different ways of collecting measurement data. For example, Zabbix supports pushing with zabbix-agent, while Prometheus recommends using prometheus-server [pulling](https://prometheus.io/docs/practices/pushing/). Similarly, data exchange protocols are also different, so adaptation is often needed one by one.

#### How to Use

##### Add Configuration

If you need to enable TC Metrics, you need to add configuration items in its configuration file:

Take file.conf for example

```text
## metrics settings
metrics {
  enabled = true
  registryType = "compact"
  # multi exporters use comma divided
  exporterList = "prometheus"
  exporterPrometheusPort = 9898
}
```

Or You can use application.yaml for versions above 1.5.0

```yaml
seata:
  metrics:
    enabled: true
    registryType: compact
    exporterList: prometheus
    exporterPrometheusPort: 9898
```

Or You can also use a third-party configuration center such as nacos, apollo, etc.

[Please refer to here](https://github.com/apache/incubator-seata/tree/develop/script/config-center) to upload the seata metrics configuration items to the corresponding configuration center, or open the corresponding configuration center console for manually adding.

```properties
metrics.enabled=true
metrics.registryType=compact
metrics.exporterList=prometheus
metrics.exporterPrometheusPort=9898
```

After starting TC, you can get the text format data of Metrics on `http://tc-server-ip:9898/metrics`.

> Tips: Port `9898` is used by default, and the list of ports registered by Prometheus [can be visited here](https://github.com/prometheus/prometheus/wiki/Default-port-allocations). If you want to change this port, you can use `metrics.exporter.prometheus.port` to modify the configuration.

##### Download and start Prometheus

After the download is complete, modify the Prometheus configuration file `prometheus.yml`, and add an item to grab Seata's measurement data in `scrape_configs`:

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

##### View data output

It is recommended to combine the configuration [Grafana] (https://prometheus.io/docs/visualization/grafana/) to obtain better query results. The initial Metrics exported by Seata include:

- TC :

| Metrics                                                                               | Description                                                                        |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| seata.transaction(role=tc,meter=counter,status=active/committed/rollback)             | Total number of currently active/committed/rollback transactions                   |
| seata.transaction(role=tc, meter=summary, statistic=count, status=committed/rollback) | The number of transactions committed/rolled back in the current cycle              |
| seata.transaction(role=tc,meter=summary,statistic=tps,status=committed/rollback)      | Transaction TPS(transaction per second) committed/rolled back in the current cycle |
| seata.transaction(role=tc, meter=timer, statistic=total, status=committed/rollback)   | The sum of time-consuming transactions committed/rolled back in the current cycle  |
| seata.transaction(role=tc, meter=timer, statistic=count, status=committed/rollback)   | The number of transactions committed/rolled back in the current cycle              |
| seata.transaction(role=tc, meter=timer, statistic=average, status=committed/rollback) | The average transaction time spent on committing/rolling back in the current cycle |
| seata.transaction(role=tc, meter=timer, statistic=max, status=committed/rollback)     | The maximum time-consuming transaction committed/rolled back in the current cycle  |

Hint: the values of seata.transaction(role=tc, meter=summary, statistic=count, status=committed/rollback) and seata.transaction(role=tc, meter=timer, statistic=count, status=committed/rollback) may be the same, but they are derived from two different metrics.

-TM:

TM will be implemented later, including:
seata.transaction(role=tm,name=\{GlobalTransactionalName},meter=counter,status=active/committed/rollback) : Use GlobalTransactionalName as the dimension to distinguish the status of different Transactional.

-RM:

RM will be implemented later, including:
seata.transaction(role=rm, name=\{BranchTransactionalName}, mode=at/mt, meter=counter, status=active/committed/rollback): Use BranchTransactionalName as the dimension and AT/MT dimension to distinguish the transactional status of different branches.

#### How to extend

If there are any of the following situations:

1. You do not use Prometheus as the operation and maintenance monitoring system, but you want to integrate Seata's Metrics data into Dashboard;
2. You need more complex and powerful metric types, which already exist in other Metrics implementation libraries, and hope to integrate these third-party dependencies for direct use;
3. You need to change the Measurement output of the default Metric, such as adding a `min` or `sd` (variance) to the Timer;
4. ...

Then you need to extend the implementation of Metrics by yourself, please create a new module project such as `seata-metrics-xxxx`, after that:

- For 1: you need to implement a new Exporter;
- For 2: You can change the default Registry implementation and return the third-party Meter implementation;
- For 3: You can modify the implementation of the corresponding Meter, including the Measurement list returned by the `measure()` method.
