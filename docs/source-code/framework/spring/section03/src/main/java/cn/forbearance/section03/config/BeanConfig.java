package cn.forbearance.section03.config;

import cn.forbearance.section03.bean.Book;
import cn.forbearance.section03.service.BookService;
import org.springframework.context.annotation.*;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.core.type.filter.AspectJTypeFilter;
import org.springframework.core.type.filter.RegexPatternTypeFilter;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

/**
 * @author cristina
 */


//@ComponentScan(value = "cn.forbearance.section03", includeFilters = {
//        @Filter(type = FilterType.ANNOTATION, classes = {Controller.class})
//}, useDefaultFilters = false)

//@ComponentScan(value = "cn.forbearance.section03", includeFilters = {
//        @Filter(type = FilterType.ASSIGNABLE_TYPE, classes = {BookService.class})
//}, useDefaultFilters = false)

//@ComponentScan(value = "cn.forbearance.section03", includeFilters = {
//        @Filter(type = FilterType.ASPECTJ, classes = {AspectJTypeFilter.class})
//}, useDefaultFilters = false)

//@ComponentScan(value = "cn.forbearance.section03", includeFilters = {
//        @Filter(type = FilterType.REGEX, classes = {RegexPatternTypeFilter.class})
//}, useDefaultFilters = false)

@ComponentScan(value = "cn.forbearance.section03", includeFilters = {
        @Filter(type = FilterType.CUSTOM, classes = {CustomFilterType.class})
}, useDefaultFilters = false)
@Configuration
public class BeanConfig {

    @Bean
    public Book book() {
        return new Book("forbearance.cn", 49);
    }
}
