
package com.klef.soa.docker.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.soa.docker.dto.PhotographyPackageRequest;
import com.klef.soa.docker.entity.PhotographyPackage;
import com.klef.soa.docker.service.PhotographyPackageService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class PhotographyPackageController {

    @Autowired
    private PhotographyPackageService service;

    @PostMapping("/add")
    public ResponseEntity<PhotographyPackage> addPackage(
            @Valid @RequestBody PhotographyPackageRequest request) {

        PhotographyPackage saved = service.addPackage(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/all")
    public List<PhotographyPackage> viewAllPackages() {
        return service.viewAllPackages();
    }

    // VIEW PACKAGE BY ID
    @GetMapping("/{id}")
    public ResponseEntity<PhotographyPackage> viewPackageById(
            @PathVariable Long id) {

        PhotographyPackage photographyPackage =
                service.viewPackageById(id);

        if (photographyPackage == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(photographyPackage);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PhotographyPackage> updatePackage(
            @PathVariable Long id,
            @Valid @RequestBody PhotographyPackageRequest request) {

        PhotographyPackage updated =
                service.updatePackage(id, request);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    // DELETE PACKAGE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePackage(@PathVariable Long id) {

        if (service.viewPackageById(id) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Photography Package not found");
        }

        service.deletePackage(id);

        return ResponseEntity.ok(
                "Photography Package deleted successfully");
    }

    @GetMapping("/search")
    public List<PhotographyPackage> searchPackages(
            @RequestParam String name) {

        return service.searchPackages(name);
    }

    @GetMapping("/filter/price")
    public List<PhotographyPackage> filterByPrice(
            @RequestParam double minPrice,
            @RequestParam double maxPrice) {

        return service.filterByPrice(minPrice, maxPrice);
    }

    @GetMapping("/filter/album")
    public List<PhotographyPackage> filterByAlbum(
            @RequestParam Boolean includesAlbum) {

        return service.filterByAlbum(includesAlbum);
    }

    @GetMapping("/sort/price")
    public List<PhotographyPackage> sortByPrice(
            @RequestParam(defaultValue = "asc") String direction) {

        return service.sortByPrice(direction);
    }

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardStats() {

        return service.getDashboardStats();
    }
}
