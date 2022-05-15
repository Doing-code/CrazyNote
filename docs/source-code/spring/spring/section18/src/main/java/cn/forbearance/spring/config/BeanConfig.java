package cn.forbearance.spring.config;

import cn.forbearance.spring.bean.Person;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 * @author cristina
 */
@Configuration
@PropertySource("classpath:/application.properties")
public class BeanConfig {

    @Bean
    public Person person() {
        return new Person();
    }
}
