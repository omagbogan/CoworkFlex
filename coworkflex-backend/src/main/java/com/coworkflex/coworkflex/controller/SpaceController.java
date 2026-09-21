package com.coworkflex.coworkflex.controller;

import com.coworkflex.coworkflex.entity.Space;
import com.coworkflex.coworkflex.entity.Desk;
import com.coworkflex.coworkflex.service.SpaceService;
import com.coworkflex.coworkflex.service.DeskService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/spaces")
public class SpaceController {

    private final SpaceService spaceService;
    private final DeskService deskService;

    public SpaceController(SpaceService spaceService, DeskService deskService) {
        this.spaceService = spaceService;
        this.deskService = deskService;
    }

    @GetMapping
    public List<Space> getAllSpaces(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Integer capacity) {
        return spaceService.getAllSpaces(city, capacity);
    }

    @GetMapping("/{id}/desks")
    public List<Desk> getDesksBySpace(@PathVariable Long id) {
        return deskService.getDesksBySpaceId(id);
    }
}