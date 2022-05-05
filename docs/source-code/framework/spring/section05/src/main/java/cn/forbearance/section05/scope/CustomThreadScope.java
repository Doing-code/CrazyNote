package cn.forbearance.section05.scope;

import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.config.Scope;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * @author cristina
 */
public class CustomThreadScope implements Scope {

    public static final String THREAD_SCOPE = "thread";

    private ThreadLocal<Map<String, Object>> beanMaps = new ThreadLocal(){
        @Override
        protected Object initialValue() {
            return new HashMap<>(16);
        }
    };

    @Override
    public Object get(String name, ObjectFactory<?> objectFactory) {
        Object bean = beanMaps.get().get(name);
        if (Objects.isNull(bean)) {
            bean = objectFactory.getObject();
            beanMaps.get().put(name, bean);
        }
        return bean;
    }

    @Override
    public Object remove(String name) {
        return beanMaps.get().remove(name);
    }

    @Override
    public void registerDestructionCallback(String name, Runnable callback) {
        System.out.println(name);
    }

    @Override
    public Object resolveContextualObject(String key) {
        return null;
    }

    @Override
    public String getConversationId() {
        return Thread.currentThread().getName();
    }
}
