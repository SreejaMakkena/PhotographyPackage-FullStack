
package com.klef.soa.docker.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@Table(name = "photography_packages")
@Data
public class PhotographyPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Package name is required")
    @Size(min = 3, max = 100)
    @Column(nullable = false)
    private String packageName;

    @Min(value = 1, message = "Hours must be at least 1")
    private int hoursIncluded;

    @DecimalMin(value = "0.0", inclusive = false,
                message = "Price must be greater than zero")
    private double price;

    @NotNull(message = "Please specify album inclusion")
    private Boolean includesAlbum;
}
