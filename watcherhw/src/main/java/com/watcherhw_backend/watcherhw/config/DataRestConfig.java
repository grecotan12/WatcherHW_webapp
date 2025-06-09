// package com.watcherhw_backend.watcherhw.config;

// import java.util.ArrayList;
// import java.util.List;
// import java.util.Set;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
// import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
// import org.springframework.http.HttpMethod;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;

// import jakarta.persistence.EntityManager;
// import jakarta.persistence.metamodel.EntityType;

// @Configuration
// public class DataRestConfig implements RepositoryRestConfigurer{
//     private String theAllowedOrigions = "http://localhost:3000";

//     @Override
//     public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,  
//     CorsRegistry cors) {
//         // HttpMethod[] theUnsupportedActions = {
//         //     HttpMethod.POST, 
//         //     HttpMethod.PATCH, 
//         //     HttpMethod.PUT, 
//         //     HttpMethod.DELETE};

//         // disableHttpMethods(Ingredient.class, config, theUnsupportedActions);

//         /* Configure CORS mappping */
//         cors.addMapping(config.getBasePath() + "/**")
//             .allowedOrigins(theAllowedOrigions);
//     }

//     // private void disableHttpMethods(Class<Ingredient> theClass, 
//     //         RepositoryRestConfiguration config,
//     //         HttpMethod[] theUnsupportedActions) {
//     //     config.getExposureConfiguration()
//     //         .forDomainType(theClass)
//     //         .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
//     //         .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
//     // }
// }

