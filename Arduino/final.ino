#include "WiFiEsp.h"
#include "ThingSpeak.h"
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#define OLED_RESET -1
#define OLED_I2C_ADDR 0x3C
#include <stdio.h>
#include <string.h>
#include <Arduino.h>

#define SIZE 500
#define SIZE2 200



unsigned long t1;
unsigned long t2;
float pressure_data[SIZE];
float wave_data[SIZE];
int heartbeat;
int heartbeathigh=0;
float val_hb;
int val_bp;
int dis_peak[SIZE2];
int pres_when_dis_peak[SIZE2];
int peak_num = 0;  
int check=0;

long bradrate = 115200;

int stepcount = 0;


char ssid[] = "EE3070_P1404_1"; // your network SSID (name) 
char pass[] = "EE3070P1404"; // your network password 
unsigned long chid = 1875551;
const char * myWriteAPIKey = "00QTPI96UM4RCV2W";

WiFiEspClient client; 


//LED
#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
#define OLED_RESET -1 // SSD1306 doesn't have a reset pin
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
void setupOLED(void) {
// SSD1306_SWITCHCAPVCC = generate display voltage from 3.3V internally
  if(!display.begin(SSD1306_SWITCHCAPVCC, OLED_I2C_ADDR)) { // Address 0x3C for SSD1306 128x64
    Serial.println(F("SSD1306 allocation failed"));
    for(;;) yield(); // Don't proceed, loop forever
  }
}  

void setup() {
  
  //set up 
  Serial.begin(bradrate);
  Serial1.begin(bradrate);
  Serial2.begin(bradrate); // microbit tx3 rx3
  
  WiFi.init(&Serial1);   
  ThingSpeak.begin(client);

  if(WiFi.status() != WL_CONNECTED){ 
    Serial.print("Attempting to connect to SSID: "); 
    Serial.println(ssid); 
    while(WiFi.status() != WL_CONNECTED){ 
        WiFi.begin(ssid, pass); // Connect to WPA/WPA2 network 
        Serial.print("."); 
        delay(5000); 
    } 
  Serial.println("\nConnected"); 
  }
    pinMode(12, INPUT_PULLUP); //Button B record Diastolic pressure
  setupOLED();  // setup data screeen to display data
  display.clearDisplay();
  display.setTextSize(1); // Normal 1:1 pixel scale
  display.setTextColor(WHITE,BLACK); // Draw white text
  
  display.setCursor(0,0);
  display.cp437(true); // Use full 256 char 'Code Page 437' font
  display.print("RT");
  
  display.setCursor(0, 16); // Start at top-left corner
  display.print("HB  :            bpm");
  
  display.setCursor(0, 32);
  display.print("SYS_BP :         mmHg");

  display.setCursor(0,48);
  display.print("DIA_BP :         mmHg");

  display.display();
  delay(2000);
          // initialize to 0
  for (int i = 0;i<SIZE2;i++) dis_peak[i] =0;
  for (int i = 0;i<SIZE2;i++) pres_when_dis_peak[i] =0;
  
  
}

void getpressure(){ 

   t1=millis();
   for(int counter=0;counter<SIZE;counter++){
      val_bp = int((80.0064*5*analogRead(A1)/1023)- 24.0019);
      val_hb=analogRead(A0);
      if(val_bp>0&&val_hb>100){
      wave_data[counter]=val_hb;
      pressure_data[counter]=val_bp;   }
      //Serial.println(val_hb);
      delay(10);
    }
   t2=millis();  
    int a=0, before1=0, mid=0, after1=0, b=0,num1,num2,dis=0,before2,after2;
    int mid_pressure;
    int heartbeatnum=0;  
    int checksys=0,checkdia=0;

    
    for (int i=0;i<(SIZE-10);i++){      
        //before2 = wave_data[i]; 
        before1 = wave_data[i]; 
        mid = wave_data[i+5];
        after1 = wave_data[i+10]; 
        //after2 = wave_data[i+58];
        // Increasing at the front and decreasing at the back
        
        if(before1<mid&&mid>after1){
          for(int j=i;j<i+35;j++){
             a=wave_data[j];
                    if(a>b){
                      b=a;
                      num1=j;
                      
            }   
          }
          checksys=1;
          i=i+20;
        }
                b=500;
          if(before1>mid&&mid>before2){
                 for(int j=i;j<i+35;j++){
                    a=wave_data[j];
                    if(a<b){
                      b=a;
                      num2=j;
                    }
                  }
                  checkdia=1;
                  i=i+10;
                }
        

              if(checkdia+checksys==2){
                dis_peak[peak_num]=wave_data[num1]-wave_data[num2];
                pres_when_dis_peak[peak_num]=pressure_data[num1];
                peak_num++;
                heartbeatnum++;
                
                checkdia=0;
                checksys=0;
              }
            
    }
    heartbeat=(heartbeatnum+1)*60000/(t2-t1);
    int t;
    t=heartbeat;
    if(t>heartbeathigh&&t<=95){
      heartbeathigh=t;
    }
    // find the maximum peak
    int peak_max= 0;    
    int temp = 0;
    
    int peak_min=0;
    int sys;
    int dia;
    int peak_max_num;
    int peak_min_num;
    int num=0;
    for(int i=0;i<SIZE2;i++){
      
        temp = dis_peak[i];       
        if(temp>peak_max&&temp<400){
            peak_max = temp;
               num=i;            
    }
    
    }
    //dia
    peak_min_num=0;
    for(int i=num;i<SIZE2;i++){
      if((dis_peak[i+1]<=dis_peak[num]*0.3+3)&&(dis_peak[i]>=dis_peak[num]*0.3-3)){
        peak_min_num=i;
        
      }
     
    }
    //sys
    
   for(int i=0;i<num;i++){
      if((dis_peak[i]<=dis_peak[num]*0.8+8)&&(dis_peak[i]>=dis_peak[num]*0.8-8)){         
        peak_max_num=i;    
           
      }
    
    }

   
   sys=pres_when_dis_peak[peak_max_num];
   dia=pres_when_dis_peak[peak_min_num];
  /* if(sys>140||sys<0){
      sys=122;
    
   }
   if((dia>100||dia<0)&&val_bp<=83){
      dia=83;
    
   }*/
    
   /*          for(int i=0;i<SIZE2;i++){
      Serial.println("---------------");
      Serial.println(i);
      Serial.println("dis ");      
      Serial.println(dis_peak[i]);
      Serial.println("press");
      Serial.println(pres_when_dis_peak[i]);
      Serial.println("peakmax");
      Serial.println(peak_max);
      Serial.println("dismax,min");
      Serial.println(dis_peak[peak_max_num]);
      Serial.println(dis_peak[peak_min_num]);
      Serial.println("interval");
      Serial.println(interval);
      } */
       for(int i=0;i<SIZE2;i++){
      Serial.println("---------------");
      Serial.println(i);
      Serial.println("dis ");      
      Serial.println(dis_peak[i]);
      Serial.println("press");
      Serial.println(pres_when_dis_peak[i]);
      Serial.println("peakmax");
      Serial.println(peak_max);
      Serial.println("dismax,min");
      Serial.println(dis_peak[peak_max_num]);
      Serial.println(dis_peak[peak_min_num]);

      }

      display.fillRect(50,0,45,8, BLACK);
      display.setTextColor(WHITE,BLACK); // Draw white text
      display.setCursor(50, 0);
      display.print(String(val_bp,DEC));
      display.display();  
    
      display.fillRect(50,16,45,8, BLACK);
      display.setTextColor(WHITE,BLACK); // Draw white text
      display.setCursor(50, 16);
      display.print(String(heartbeathigh,DEC));
      display.display();           
      
      display.fillRect(50,32,45,8, BLACK);
      display.setTextColor(WHITE,BLACK); // Draw white text
      display.setCursor(50, 32);
      display.print(String(sys,DEC));
      display.display();
      
      display.fillRect(50,48,45,8, BLACK);
      display.setTextColor(WHITE,BLACK); // Draw white text
      display.setCursor(50, 48);
      display.print(String(dia,DEC));
      display.display();


}

void loop() {
  // set checker to 0, then clear the input buffer input from step counter 

  updatestep();

  val_hb=analogRead(A0);
  val_bp = int((80.0064*5*analogRead(A1)/1023)- 24.0019);
      display.fillRect(50,0,45,8, BLACK);
      display.setTextColor(WHITE,BLACK); // Draw white text
      display.setCursor(50, 0);
      display.print(String(val_bp,DEC));
      display.display();
        
  if(val_bp>150||check==1){
    check=1;
    if(val_bp<=140){
      getpressure();
      
 }
  }
  
}




void updatestep(){
  
  if (Serial2.available() > 0) {
    
      stepcount = Serial2.parseInt();
      String empty = Serial2.readString();
      
      Serial.println("the step is "+ String(stepcount));
      int x = ThingSpeak.writeField(chid, 4, stepcount, myWriteAPIKey);
      if(x == 200){
        Serial.println("Channel update successful.");
      }
      else{
        Serial.println("Problem updating channel. HTTP error code " + String(x));
      }
  }
}
