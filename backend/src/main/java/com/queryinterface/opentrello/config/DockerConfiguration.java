package com.queryinterface.opentrello.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

import javax.sql.DataSource;

@Configuration
@Profile("docker")
public class DockerConfiguration {
    @Bean
    public DataSource getDataSource() {
        DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName("org.postgresql.Driver");
        dataSourceBuilder.url(getSystemProperty("DB_URI", "jdbc:postgresql://openkb-db:5432/postgres"));
        dataSourceBuilder.username(getSystemProperty("DB_USER", "postgres"));
        dataSourceBuilder.password(getSystemProperty("DB_PASSWORD","Password1"));
        DataSource dataSource = dataSourceBuilder.build();
        return dataSource;
    }

    private String getSystemProperty(final String propertyName, final String defaultValue) {
        final String value = System.getenv(propertyName);
        if (value == null) {
            return defaultValue;
        }
        return defaultValue;
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        HibernateJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
        adapter.setGenerateDdl(true);
        adapter.setDatabase(Database.POSTGRESQL);

        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        factory.setJpaVendorAdapter(adapter);
        factory.setPackagesToScan("com.queryinterface.opentrello");
        factory.setDataSource(getDataSource());
        return factory;
    }
}
