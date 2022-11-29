# Write your code here :-)
from microbit import *

S = 200
uart.init(baudrate=115200, tx = pin8, rx = pin12)

while True:

    count = 0
    a = []
    step = 0

    while count < S:
        tem = accelerometer.get_values()
        x = tem[0]/1000
        y = tem[1]/1000
        z = tem[2]/1000
        ai = x**2 + y**2 + z**2
        ai = ai**.5


        a.append(ai)
        count = count + 1

        sleep(100)


    p = [0 for n in range(S)]
    index = 1


    while index < count - 1:
        if a[index-1] < a[index] and a[index] > a[index+1]:
            if a[index] > 1.1 or a[index] < 1:
                p[index] = 1
        index = index + 1

    cur = 0
    pre = 0

    while cur < count:
        if p[cur] == 1:
            if pre != 0:
                D = cur - pre -1
                if D > 2:
                    step = step + 1
            pre = cur
        cur = cur + 1

    if cur == count:
        D = count - pre
        if D > 2:
            step = step + 1


    if step > 1:
        uart.write(str(step))








