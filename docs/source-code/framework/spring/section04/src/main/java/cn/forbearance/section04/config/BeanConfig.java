package cn.forbearance.section04.config;

import cn.forbearance.section04.bean.Book;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

/**
 * @author cristina
 */
@Configuration
public class BeanConfig {

    @Scope(value = "thread")
    @Bean
    public Book book() {
        System.out.println("向Spring容器中注册组件");
        return new Book("forbearance.cn", 49);
    }
}
