package cn.forbearance.spring;

import cn.forbearance.spring.bean.Color;
import cn.forbearance.spring.config.BeanConfig;
import cn.forbearance.spring.handler.CustomInvocationHandler;
import cn.forbearance.spring.service.UserService;
import cn.forbearance.spring.service.impl.UserServiceImpl;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;
import org.springframework.cglib.proxy.Enhancer;
import org.springframework.cglib.proxy.MethodInterceptor;
import org.springframework.cglib.proxy.MethodProxy;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import javax.sql.DataSource;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

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

    @Test
    public void test03() {
        // 实例化目标对象
        UserService userService = new UserServiceImpl();

        // 实例化 InvocationHandler
        CustomInvocationHandler invocationHandler = new CustomInvocationHandler(userService);

        // 根据目标对象生成代理对象
        UserService proxy = (UserService) invocationHandler.getProxy();

        // 调用代理对象的方法
        proxy.add();
    }

    @Test
    public void test04() {
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(AppTest.class);
        enhancer.setCallback(new CustomMethodInterceptor());

        AppTest test = (AppTest) enhancer.create();
//        test.test();
        System.out.println("**********");
        System.out.println(test);
    }

    @Test
    public void test() {

    }

    private static class CustomMethodInterceptor implements MethodInterceptor {

        @Override
        public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
            System.out.println("before invoke " + method);
            Object result = methodProxy.invokeSuper(o, objects);
            System.out.println("after invoke " + method);
            return result;
        }
    }

    public void test05() {
        try {
            // 读取配置文件
            InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
            // 1.SqlSessionFactory 的初始化
            SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
            // 2.获取 SqlSession 对象
            SqlSession sqlSession = sqlSessionFactory.openSession();
            // 3.获取接口的代理对象
            Object mapper = sqlSession.getMapper(Object.class);
            // 4. 查询实现
//            User user = mapper.selectById(1);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
