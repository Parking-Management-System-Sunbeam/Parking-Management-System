package com.ParkIt.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ParkIt.Dao.LocationRepository;
import com.ParkIt.Dao.SlotRepository;
import com.ParkIt.Entities.Location;
import com.ParkIt.Entities.Slot;

@RestController
@RequestMapping("/api/slots")
public class SlotController {
    @Autowired
    private SlotRepository slotRepository;
    @Autowired
    private LocationRepository locationRepository;
    @PostMapping("/generate")
    public ResponseEntity<?> generateSlots(@RequestParam Long locationId, @RequestParam int totalSlots) {
        Optional<Location> locationOpt = locationRepository.findById(locationId);
        if (!locationOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Location not found");
        }

        Location location = locationOpt.get();
        for (int i = 1; i <= totalSlots; i++) {
            Slot slot = new Slot();
            slot.setSlotNumber("SLOT-" + i);
            slot.setStatus("AVAILABLE");
            slot.setLocation(location);
            slotRepository.save(slot);
        }

        return ResponseEntity.ok("Slots generated successfully.");
    }
}

