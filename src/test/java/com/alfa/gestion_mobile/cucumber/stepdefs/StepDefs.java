package com.alfa.gestion_mobile.cucumber.stepdefs;

import com.alfa.gestion_mobile.GestionMobileApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = GestionMobileApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
