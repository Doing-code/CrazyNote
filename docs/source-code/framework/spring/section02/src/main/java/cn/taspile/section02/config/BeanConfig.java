package cn.taspile.section02.config;

import cn.taspile.section02.bean.Book;
import org.springframework.context.annotation.*;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

/**
 * @author cristina
 */

@Configuration
@ComponentScans(value = {
        @ComponentScan(value = "cn.taspile.section02", includeFilters = {
                /*
                 * type: 指定要排除的规则，按照注解进行排除、or 按照给定的类型进行配出、等等...
                 * classes: Spring在扫描时，只包含指定注解标注的类
                 */
                @Filter(type = FilterType.ANNOTATION, classes = {Service.class}),
        }, useDefaultFilters = false),
        @ComponentScan(value = "cn.taspile.section02", excludeFilters = {
                /*
                 * type: 指定要排除的规则，按照注解进行排除、or 按照给定的类型进行配出、等等...
                 * classes: Spring在扫描时，排除指定注解标注的类
                 */
                @Filter(type = FilterType.ANNOTATION, classes = {Controller.class, Repository.class})
        })
})
public class BeanConfig {

    @Bean
    public Book book() {
        return new Book("鸟哥Linux私房菜", 49);
    }
}
