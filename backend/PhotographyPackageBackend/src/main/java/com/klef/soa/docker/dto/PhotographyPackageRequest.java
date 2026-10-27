
package com.klef.soa.docker.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class PhotographyPackageRequest {

    @NotBlank(message = "Package name is required")
    @Size(min = 3, max = 100,
          message = "Package name must be 3 to 100 characters")
    private String packageName;

    @NotNull(message = "Hours are required")
    @Min(value = 1, message = "Hours must be at least 1")
    private Integer hoursIncluded;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false,
                message = "Price must be greater than zero")
    private Double price;

    @NotNull(message = "Please specify album inclusion")
    private Boolean includesAlbum;
}
