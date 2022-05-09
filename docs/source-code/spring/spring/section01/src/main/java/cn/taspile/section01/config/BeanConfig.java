package cn.taspile.section01.config;

import cn.taspile.section01.bean.Person;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author cristina
 */
@Configuration
public class BeanConfig {

    @Bean("person111")
    public Person person() {
        return new Person("yuanwu", 23);
    }
}
