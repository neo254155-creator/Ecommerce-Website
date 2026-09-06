package com.SpringStore.Ecommerce.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.SpringStore.Ecommerce.Repository.CategoryRepository;
import com.SpringStore.Ecommerce.Repository.ProductsRepository;
import com.SpringStore.Ecommerce.dto.ProductRequestDto;
import com.SpringStore.Ecommerce.dto.ProductResponseDto;
import com.SpringStore.Ecommerce.entity.Category;
import com.SpringStore.Ecommerce.entity.Products;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductsRepository productsRepository;
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    public ProductServiceImpl(ProductsRepository productsRepository, CategoryRepository categoryRepository, ModelMapper modelMapper) {
        this.productsRepository = productsRepository;
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ProductResponseDto> getAllProducts() {
        List<Products> product = productsRepository.findAll();
        return product.stream()
                .map(p -> modelMapper.map(p, ProductResponseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponseDto getProductById(Long id) {
        Products product = productsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + id));
        return modelMapper.map(product, ProductResponseDto.class);
    }

    @Override
    public ProductResponseDto AddProducts(ProductRequestDto productRequestDto) {
        Category category = categoryRepository.findById(productRequestDto.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found with ID: " + productRequestDto.getCategoryId()));

        Products product = modelMapper.map(productRequestDto, Products.class);
        product.setCategory(category);

        Products products = productsRepository.save(product);
        return modelMapper.map(products, ProductResponseDto.class);
    }

	@Override
	public void deleteProductById(Long id) {
if(!productsRepository.existsById(id)){
	 throw new IllegalArgumentException("Product does not exists by id: "+id);
}
productsRepository.deleteById(id);
	}

	
	@Override
	public ProductResponseDto partialUpdate(Long id, Map<String, Object> update) {
	Products product=productsRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + id));
	   update.forEach((field, value) -> {
           switch (field) {
               case "price":
product.setPrice((double)value);
break;
case "stock":
	product.setStock((int)value);
	break;
default:
    throw new IllegalArgumentException("Field is not supported");
           }
           });
	   Products product1=productsRepository.save(product);
	   return modelMapper.map(product1,ProductResponseDto.class);   
	}

	@Override
	public List<ProductResponseDto> getProductsByCategory(Long categoryId) {
	    List<Products> products = productsRepository.findByCategoryId(categoryId);
	    
	    return products.stream()
	            .map(p -> modelMapper.map(p, ProductResponseDto.class))
	            .collect(Collectors.toList());
	}
	@Override
	public ProductResponseDto searchProductsByName(String name) {
	    Products products = productsRepository.findByName(name);
	    return modelMapper.map(products,ProductResponseDto.class);
	
}

}



		
	
