#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 29 13:53:42 2021

@author: evazs
"""

from selenium import webdriver
browser = webdriver.Chrome('/usr/local/bin/chromedriver')

browser.get('https://www.instagram.com/yourkoselicakesnepal/following/')

browser.find_element_by_class_name("sqdOP  L3NKy    _8A5w5")