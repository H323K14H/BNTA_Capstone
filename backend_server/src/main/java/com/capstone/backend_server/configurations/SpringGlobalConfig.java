package com.capstone.backend_server.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
//  This annotation causes Spring to load properties from the specified file
@PropertySource("classpath:application-dev.properties")
public class SpringGlobalConfig implements WebMvcConfigurer {
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedHeaders("*")
                .allowedMethods("*");
    }

    @Autowired
//    This injects an environment object that gives us access to the properties
    private Environment env;

    @Bean
    public String apiKey() {
//        This method retrieves the value of the apiKey property
        return env.getProperty("apiKey");
    }
}
