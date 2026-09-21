package com.coworkflex.coworkflex.service;

import com.coworkflex.coworkflex.entity.Space;
import com.coworkflex.coworkflex.repository.SpaceRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SpaceService {

    private final SpaceRepository spaceRepository;

    public SpaceService(SpaceRepository spaceRepository) {
        this.spaceRepository = spaceRepository;
    }

    public List<Space> getAllSpaces(String city, Integer capacity) {
    if (city != null && capacity != null) {
        return spaceRepository.findByCityIgnoreCaseAndCapacityGreaterThanEqual(city, capacity);
    } else if (city != null) {
        return spaceRepository.findByCityIgnoreCase(city);
    } else if (capacity != null) {
        return spaceRepository.findByCapacityGreaterThanEqual(capacity);
    }
    return spaceRepository.findAll();
}
}