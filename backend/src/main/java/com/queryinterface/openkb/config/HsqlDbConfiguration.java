package com.queryinterface.openkb.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration(proxyBeanMethods = false)
@Profile("dbHsql")
public class HsqlDbConfiguration {
    @Bean
    public DataSource getDataSource() {
        DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName("org.hsqldb.jdbc.JDBCDriver");
        dataSourceBuilder.url(getSystemProperty("DB_URI", "jdbc:hsqldb:file:" + getSystemProperty("DB_FILE_PATH", "openkb.dat")));
        dataSourceBuilder.username(getSystemProperty("DB_USER", "hsqldb"));
        dataSourceBuilder.password(getSystemProperty("DB_PASSWORD","Password1"));
        DataSource dataSource = dataSourceBuilder.build();
        return dataSource;
    }

    private String getSystemProperty(final String propertyName, final String defaultValue) {
        final String value = System.getenv(propertyName);
        if (value == null) {
            return defaultValue;
        }
        return value;
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        HibernateJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
        adapter.setGenerateDdl(false);
        adapter.setDatabase(Database.HSQL);

        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        factory.setJpaVendorAdapter(adapter);
        factory.setPackagesToScan("com.queryinterface.openkb");
        factory.setDataSource(getDataSource());
        /*Properties jpaProperties = new Properties();
        jpaProperties.put("hibernate.bytecode.provider", "none");
        jpaProperties.put("spring.datasource.initialization-mode", "always");
        jpaProperties.put("spring.datasource.schema", "classpath*:db/schema.sql");
        jpaProperties.put("spring.jpa.hibernate.ddl-auto", "none");
        jpaProperties.put("spring.jpa.open-in-view", "false");
        factory.setJpaProperties(jpaProperties);*/
        return factory;
    }
}
