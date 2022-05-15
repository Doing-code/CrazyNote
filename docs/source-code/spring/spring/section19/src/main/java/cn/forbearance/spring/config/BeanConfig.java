package cn.forbearance.spring.config;

import cn.forbearance.spring.bean.Person;
import cn.forbearance.spring.mapper.BookMapper;
import org.springframework.context.annotation.*;

/**
 * @author cristina
 */
@Configuration
@PropertySource("classpath:/application.properties")
@ComponentScan({"cn.forbearance.spring.mapper", "cn.forbearance.spring.service"})
public class BeanConfig {

    @Bean("person")
    public Person person() {
        return new Person();
    }

    @Primary
    @Bean("bookMapper1")
    public BookMapper bookMapper1() {
        BookMapper bookMapper = new BookMapper();
        bookMapper.setLabel("2");
        return bookMapper;
    }

}
