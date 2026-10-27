
package com.klef.soa.docker.service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.klef.soa.docker.dto.PhotographyPackageRequest;
import com.klef.soa.docker.entity.PhotographyPackage;
import com.klef.soa.docker.repository.PhotographyPackageRepository;

@Service
public class PhotographyPackageServiceImpl implements PhotographyPackageService {

    @Autowired
    private PhotographyPackageRepository repository;

    private void copyDetails(PhotographyPackageRequest request,PhotographyPackage photographyPackage) {

        photographyPackage.setPackageName(request.getPackageName());
        photographyPackage.setHoursIncluded(request.getHoursIncluded());
        photographyPackage.setPrice(request.getPrice());
        photographyPackage.setIncludesAlbum(request.getIncludesAlbum());
    }

    @Override
    public PhotographyPackage addPackage(PhotographyPackageRequest request) {

        PhotographyPackage photographyPackage = new PhotographyPackage();

        copyDetails(request, photographyPackage);

        return repository.save(photographyPackage);
    }

    @Override
    public List<PhotographyPackage> viewAllPackages() {
        return repository.findAll();
    }

    @Override
    public PhotographyPackage viewPackageById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public PhotographyPackage updatePackage(Long id,PhotographyPackageRequest request) {

        PhotographyPackage photographyPackage =
                repository.findById(id).orElse(null);

        if (photographyPackage == null) {
            return null;
        }

        copyDetails(request, photographyPackage);

        return repository.save(photographyPackage);
    }

    @Override
    public void deletePackage(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<PhotographyPackage> searchPackages(String name) {

        return repository.findAll().stream()
                .filter(p -> p.getPackageName()
                        .toLowerCase()
                        .contains(name.toLowerCase()))
                .toList();
    }

    @Override
    public List<PhotographyPackage> filterByPrice(double minPrice,double maxPrice) {

        if (minPrice < 0 || maxPrice < minPrice) {
            throw new IllegalArgumentException("Invalid price range");
        }

        return repository.findAll().stream()
                .filter(p -> p.getPrice() >= minPrice
                          && p.getPrice() <= maxPrice)
                .toList();
    }

    @Override
    public List<PhotographyPackage> filterByAlbum(Boolean includesAlbum) {

        return repository.findAll().stream()
                .filter(p -> includesAlbum.equals(p.getIncludesAlbum()))
                .toList();
    }

    @Override
    public List<PhotographyPackage> sortByPrice(String direction) {

        Sort sort;

        if ("asc".equalsIgnoreCase(direction)) {
            sort = Sort.by("price").ascending();
        } else if ("desc".equalsIgnoreCase(direction)) {
            sort = Sort.by("price").descending();
        } else {
            throw new IllegalArgumentException(
                    "Direction must be asc or desc");
        }

        return repository.findAll(sort);
    }

    @Override
    public Map<String, Object> getDashboardStats() {

        List<PhotographyPackage> packages = repository.findAll();

        long totalPackages = packages.size();

        long packagesWithAlbum = packages.stream()
                .filter(p -> Boolean.TRUE.equals(p.getIncludesAlbum()))
                .count();

        double averagePrice = packages.stream()
                .mapToDouble(PhotographyPackage::getPrice)
                .average()
                .orElse(0.0);

        Map<String, Object> stats = new HashMap<>();

        stats.put("totalPackages", totalPackages);
        stats.put("packagesWithAlbum", packagesWithAlbum);
        stats.put("packagesWithoutAlbum",
                  totalPackages - packagesWithAlbum);
        stats.put("averagePrice", averagePrice);

        return stats;
    }
}
