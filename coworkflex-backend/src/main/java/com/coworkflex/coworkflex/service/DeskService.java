package com.coworkflex.coworkflex.service;

import com.coworkflex.coworkflex.entity.Desk;
import com.coworkflex.coworkflex.repository.DeskRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DeskService {

    private final DeskRepository deskRepository;

    public DeskService(DeskRepository deskRepository) {
        this.deskRepository = deskRepository;
    }

    public List<Desk> getDesksBySpaceId(Long spaceId) {
        return deskRepository.findBySpaceId(spaceId);
    }
}