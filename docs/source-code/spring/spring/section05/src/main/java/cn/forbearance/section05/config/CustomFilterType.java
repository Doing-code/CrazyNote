package cn.forbearance.section05.config;

import org.springframework.core.io.Resource;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.core.type.ClassMetadata;
import org.springframework.core.type.classreading.MetadataReader;
import org.springframework.core.type.classreading.MetadataReaderFactory;
import org.springframework.core.type.filter.TypeFilter;

import java.io.IOException;

/**
 * @author cristina
 */
public class CustomFilterType implements TypeFilter {

    @Override
    public boolean match(MetadataReader metadataReader,
                         MetadataReaderFactory metadataReaderFactory) throws IOException {
        // 获取当前类注解的信息
        AnnotationMetadata annotationMetadata = metadataReader.getAnnotationMetadata();
        // 获取当前正在扫描的类的类信息，比如它的类型，实现的接口等等
        ClassMetadata classMetadata = metadataReader.getClassMetadata();
        // 获取当前类的资源新，类路径等等
        Resource resource = metadataReader.getResource();
        // 正在扫描的类的类名
        String className = classMetadata.getClassName();
        System.out.println("match>>" + className);
        if (className.contains("er")) {
            // 匹配成功，包含
            return true;
        }
        // 匹配不成功，排除
        return false;
    }
}
