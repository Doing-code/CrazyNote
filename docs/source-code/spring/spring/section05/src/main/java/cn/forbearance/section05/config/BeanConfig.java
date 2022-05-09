package cn.forbearance.section05.config;

import cn.forbearance.section05.bean.Book;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;

/**
 * @author cristina
 */
@Configuration
public class BeanConfig {

    @Lazy
    @Bean
    @Scope(value = "prototype")
    public Book book() {
        System.out.println("向Spring容器中注册组件");
        return new Book("forbearance.cn", 49);
    }
}
