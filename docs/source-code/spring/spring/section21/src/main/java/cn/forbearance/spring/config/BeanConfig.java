package cn.forbearance.spring.config;

import cn.forbearance.spring.bean.Blue;
import cn.forbearance.spring.bean.Color;
import cn.forbearance.spring.bean.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;


/**
 * @author cristina
 */
@Configuration
@PropertySource("classpath:/application.properties")
@ComponentScan({"cn.forbearance.spring.mapper", "cn.forbearance.spring.service", "cn.forbearance.spring.bean"})
public class BeanConfig {

    @Bean("person")
    public Person person() {
        return new Person();
    }

    @Bean
    public Blue blue() {
        return new Blue();
    }

    @Bean
    public Color color(/*@Autowired*/ Blue blue) {
        Color color = new Color();
        color.setBlue(blue);
        return color;
    }

}
