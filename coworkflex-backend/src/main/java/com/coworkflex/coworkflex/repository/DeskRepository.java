package com.coworkflex.coworkflex.repository;

import com.coworkflex.coworkflex.entity.Desk;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DeskRepository extends JpaRepository<Desk, Long> {
    List<Desk> findBySpaceId(Long spaceId);
}