package cn.forbearance.section04;

import cn.forbearance.section05.bean.Book;
import cn.forbearance.section05.config.BeanConfig;
import org.junit.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

/**
 * @author cristina
 */
public class AppTest {

    @SuppressWarnings("resource")
    @Test
    public void test01() {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(BeanConfig.class);
        Book book1 = (Book) context.getBean("book");
        Book book2 = (Book) context.getBean("book");
        System.out.println(book1 == book2);
    }
}
