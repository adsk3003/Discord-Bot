#!/bin/bash

UP=88
LOW=60
# echo "." > ./charge.txt
# while ( true ); do
    CHARGE=`cat ./charge`
    BATTERY=`acpi | awk '{print $4}' | tr -dc '0-9'`
    # echo $CHARGE

    if [ $CHARGE == "charge" ] && [ "$BATTERY" -lt "$UP" ]; then
        modprobe acpi_call && echo '\_SB.PCI0.LPCB.EC0.VPC0.SBMC 5' | tee /proc/acpi/call 
        echo "." > ./charge
        # echo 1
    elif [ $CHARGE == "stopcharge" ]; then
        modprobe acpi_call && echo '\_SB.PCI0.LPCB.EC0.VPC0.SBMC 3' | tee /proc/acpi/call
        echo "." > ./charge
        # echo 2
    # else
        # echo 3
    fi
    # sleep 30
# done