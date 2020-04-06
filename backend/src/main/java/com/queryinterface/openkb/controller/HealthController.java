package com.queryinterface.openkb.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthController {

    @RequestMapping(method = RequestMethod.GET, path = "/health")
    public ResponseEntity health() {
        return ResponseEntity.ok().build();
    }
}
