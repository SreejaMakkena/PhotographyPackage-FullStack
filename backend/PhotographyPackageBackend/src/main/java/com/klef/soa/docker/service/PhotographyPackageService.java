
package com.klef.soa.docker.service;

import java.util.List;
import java.util.Map;

import com.klef.soa.docker.dto.PhotographyPackageRequest;
import com.klef.soa.docker.entity.PhotographyPackage;

public interface PhotographyPackageService {

    PhotographyPackage addPackage(PhotographyPackageRequest request);

    List<PhotographyPackage> viewAllPackages();

    PhotographyPackage viewPackageById(Long id);

    PhotographyPackage updatePackage(Long id,PhotographyPackageRequest request);

    void deletePackage(Long id);

    List<PhotographyPackage> searchPackages(String name);

    List<PhotographyPackage> filterByPrice(double minPrice,double maxPrice);

    List<PhotographyPackage> filterByAlbum(Boolean includesAlbum);

    List<PhotographyPackage> sortByPrice(String direction);

    Map<String, Object> getDashboardStats();
}
