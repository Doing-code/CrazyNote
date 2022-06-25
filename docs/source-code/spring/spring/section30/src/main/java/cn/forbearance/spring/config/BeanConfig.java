package cn.forbearance.spring.config;

import cn.forbearance.spring.bean.Color;
import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;

import javax.sql.DataSource;


/**
 * @author cristina
 */
@EnableAspectJAutoProxy
@Configuration
@PropertySource("classpath:/application.properties")
public class BeanConfig {

    @Value("${db.user}")
    private String user;

    @Value("${db.password}")
    private String password;

    @Value("${db.driverClass}")
    private String driverClass;

    @Bean
    public Color color() {
        return new Color();
    }

    @Profile("test")
//    @Profile("default")
    @Bean("testDataSource")
    public DataSource dataSourceTest() throws Exception {
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        dataSource.setUser(user);
        dataSource.setPassword(password);
        dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/test");
        dataSource.setDriverClass(driverClass);
        return dataSource;
    }

    @Profile("dev")
    @Bean("devDataSource")
    public DataSource dataSourceDev() throws Exception {
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        dataSource.setUser(user);
        dataSource.setPassword(password);
        dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/ssm_crud");
        dataSource.setDriverClass(driverClass);
        return dataSource;
    }

    @Profile("prod")
    @Bean("prodDataSource")
    public DataSource dataSourceProd() throws Exception {
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        dataSource.setUser(user);
        dataSource.setPassword(password);
        dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/scw_0515");
        dataSource.setDriverClass(driverClass);
        return dataSource;
    }

}
