#!/usr/bin/env python
#-- coding: utf-8 --
# 
# #IMPORTS
import gspread
from datetime import datetime
import time
import RPi.GPIO as GPIO


# DEFINE VARIABLES
# SECRET CREDENTIALS FILE
gc = gspread.service_account(filename='apicredentials.json')
# API KEY
sh = gc.open_by_key('1DorK1dQWwjlAj4ZiZ9OE_o8lVTSwrah3tS0H1yJ9ctc')


# VARIABLES
worksheet = sh.sheet1
now = datetime.now()



# Function to find next empty row in spreadsheet
def next_available_row(worksheet):
    str_list = list(filter(None, worksheet.col_values(1)))
    return str(len(str_list)+1)


try:
    time.sleep(3)  # Sensor Stabilization Delay (3 seconds)

    # Infinite loop
    while True:
        if GPIO.input(pin):
            next_row = next_available_row(worksheet)
            current_datetime = now.strftime("%Y-%m-%d %H:%M:%S")

            # update_acell uses "a1, b7,etc cell notation.
            # update_cell uses "1, 1" cell notation as in 1st row 1st column.
            # The following line updates the A column and uses string substitution to \
            # dynamically assign the next available row in the sheet
            worksheet.update_acell("A{}".format(next_row), current_datetime)
            worksheet.update_acell("B{}".format(next_row), "motion")
            # return output
            print("SUCCESS")

        time.sleep(10)  # Loop delay (10 second)

finally:
    GPIO.cleanup()