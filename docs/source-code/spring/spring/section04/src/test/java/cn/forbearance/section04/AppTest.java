package cn.forbearance.section04;

import cn.forbearance.section04.config.BeanConfig;
import cn.forbearance.section04.scope.CustomThreadScope;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.concurrent.TimeUnit;

/**
 * @author cristina
 */
public class AppTest {

    @SuppressWarnings("resource")
    @Test
    public void test01() throws InterruptedException {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(BeanConfig.class);
        context.getBeanFactory().registerScope(CustomThreadScope.THREAD_SCOPE, new CustomThreadScope());
        for (int i = 0; i < 2; i++) {
            new Thread(() -> {
                System.out.println(Thread.currentThread().getName() + "***" + context.getBean("book"));
                System.out.println(Thread.currentThread().getName() + "***" + context.getBean("book"));
            }).start();
        }
        TimeUnit.SECONDS.sleep(1);
    }
}
