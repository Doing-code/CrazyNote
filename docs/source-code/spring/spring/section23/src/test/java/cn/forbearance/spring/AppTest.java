package cn.forbearance.spring;

import cn.forbearance.spring.bean.Color;
import cn.forbearance.spring.config.BeanConfig;
import org.junit.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import javax.sql.DataSource;

/**
 * @author cristina
 */
public class AppTest {

    @SuppressWarnings("resource")
    @Test
    public void test01() {
        ClassPathXmlApplicationContext classPathXmlApplicationContext = new ClassPathXmlApplicationContext("applicationContent.xml");
//        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(BeanConfig.class);
//        String[] beanNames = context.getBeanNamesForType(DataSource.class);
//        for (String beaName : beanNames) {
//            System.out.println(beaName);
//        }
//        context.close();
    }

    @SuppressWarnings("resource")
    @Test
    public void test02() {
        // 2、无参构造
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
        // 3、设置环境
        context.getEnvironment().setActiveProfiles("test");
        // 4、注册配置类
        context.register(BeanConfig.class);
        // 5、刷新容器
        context.refresh();

        String[] beanNames = context.getBeanNamesForType(DataSource.class);
        for (String beaName : beanNames) {
            System.out.println(beaName);
        }
        System.out.println("============================");
        Color color = context.getBean(Color.class);
        System.out.println(color);
        context.close();
    }
}
