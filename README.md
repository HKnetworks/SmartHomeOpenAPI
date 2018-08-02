# SmartHomeOpenAPI
HK스마트홈 Open API 문서 및 샘플코드

SmartHome Open API는 SmartHome Service와 정보를 교환하기 위해 사용되는 메시지 스펙입니다. OpenAPI에 대해 다음과 같은 내용을 다룹니다.

- HTTP 메시지
- Control Message

## HTTP 메시지

클라이언트와 SmartHome Service와 통신할 때 HTTP/1.1 프로토콜을 사용하며, 기본적인 HTTP요청과 HTTP응답을 주고 받습니다. 클라이언트와 SmartHome Service와 서로 통신 할 때 HTTP메시지본문(body)에는 JSON포맷의 메시지가 포함되어 있습니다. 여기에서는 클라이언트와 SmartHome Service 사이에서 주고받는 HTTP메시지가 어떻게 구성되는지 설명합니다.
- HTTP 헤더
- HTTP 본문
- 요청 메시지 검증

### HTTP 헤더
클라이언트가 SmartHome Service에 정보를 요청할 때 HTTP 요청을 사용합니다. 이때 HTTP 요청 헤더는 다음과 같이 구성됩니다.

````http
POST /smarthome/{apiname} HTTP/1.1
Host: open.hknetworks.kr
Content-Type: application/json;charset-UTF-8
Content-Length: 82
````

- HTTP/1.1 버전으로 HTTPS 통신을 수행하며, method로 POST 방식을 사용합니다.
- Host와 요청 대상 {apiname}은 해당 하는 API 문서를 참조 하여 지정한 대로 사용하면 됩니다.
- 본문의 데이터 형식은 JSON 형식으로 UTF-8 인코딩으로 되어 있습니다.

이와 반대로 SmartHome Service가 요청 처리 결과를 보낼 때 HTTP 응답을 사용합니다. 이때 HTTP 응답 헤더는 다음과 같이 설정됩니다.

````http
HTTP/1.1 200 OK
Content-Type: application/json;charset-UTF-8
````
- 클라이언트가 보낸 HTTP 요청에 대한 응답으로 처리 결과를 전달합니다.
- 본문의 데이터 형식은 JSON 포맷으로 되어 있으며, UTF-8 인코딩을 사용합니다.

### HTTP 본문
HTTP 요청 메시지와 응답 메시지의 본문은 JSON 포맷이며, 클라이언트 요청 정보나 처리 결과가 담긴 정보입니다. 각 메시지의 구성은 어떤 종류의 API를 사용하느냐에 따라 달라집니다. 메시지의 구성에 대한 자세한 정보는 각 API 메시지를 참조합니다.


# API 레퍼런스



## 디바이스 조회

### getDeviceList
계정에 포함된 모든 디바이스 목록을 조회 하는 API 입니다. 등록된 디바이스의 상태를 조회하거나 제어 하려면 getDeviceList API를 요청하여 반환된 디바이스 정보를 가지고 getDeviceStatus, controlDevice API등을 호출하여 사용하면 됩니다.

#### 요청 헤더
````http
POST /smarthome/getDeviceList HTTP/1.1
Host: open.hknetworks.kr
Content-Type: application/json;charset-UTF-8
Content-Length: **
````
#### 요청 본문
사용자의 디바이스 목록을 요청하려면 사용자의 계정정보를 메시지 본문에 JSON 형태로 아래와 같이 전달하여야 합니다.
````JSON
{
    "userid":"testUser",
    "password":"******",     
}
````
| 필드이름  | 자료형| 필드 설명| 포함 여부|
|:----------|:----|:---------|:-----------|
| userid | string| 요청하는 사용자의 HK스마트홈 사용자 아이디  | 항상|
| password | string| 요청하는 사용자의 HK스마트홈 사용자 패스워드  | 항상|


#### 응답 본문
응답 본문 형식은 JSON 형태로 제공되며 요청 결과 값과 디바이스 목록 배열로 구성된다.

````JSON
{
    "status":0,
    "deviceList":[
        {
            "mac":"5ccf7fcc0f83",
            "deviceId":"369ab1a4e6d54f63adfb593e6765a8c7",
            "deviceName":"오디오리모컨",
            "deviceType":7,
            "model":"mb50a",
            "online":1,
            "irDeviceID":"2397",
            "state":0            
        },
        {
            "mac":"5ccf7fcc0f83",
            "deviceId":"8e852adb9771431594809714e11f1b12",
            "deviceName":"mBox office",
            "deviceType":30,
            "model":"mb50a",
            "online":1,
            "irDeviceID":"",
            "state":0            
        },
        
    ],     
}
````
| 필드이름  | 자료형| 필드 설명| 포함 여부|
| ---------- | ----|---------|----------- |
| status | int| 요청 결과 값   | 항상|
| deviceList[] | DeviceObject array| 사용자 계정에 등록되어 있는 디바이스 객체 배열  | 항상|


### getDeviceCapability
리모컨 타입의 디바이스의 경우 지원하는 키 배열을 제공한다. 에어컨 리모컨의 경우 조합형 일 때에는 각 조합 항목별 범위를 반환한다.

#### 요청 헤더
````http
POST /smarthome/getDeviceCapability HTTP/1.1
Host: open.hknetworks.kr
Content-Type: application/json;charset-UTF-8
Content-Length: **
````
#### 요청 본문
사용자의 디바이스의 지원 기능을 요청하려면 사용자의 계정정보와 디바이스 정보를 메시지 본문에 JSON 형태로 아래와 같이 전달하여야 합니다.
````JSON
{
    "userid":"testUser",
    "password":"******",     
    "mac":"5ccf7fcc0f83",
    "deviceId":"369ab1a4e6d54f63adfb593e6765a8c7", 
    "deviceType":5,
    "irDeviceId":4736
}
````
| 필드이름  | 자료형| 필드 설명| 포함 여부|
| ---------- | ----|---------|----------- |
| userid | string| 요청하는 사용자의 HK스마트홈 사용자 아이디  | 항상|
| password | string| 요청하는 사용자의 HK스마트홈 사용자 패스워드  | 항상|
| mac | string| 요청하는 디바이스의 Mac Address  | 항상|
| deviceId | string| 요청하는 디바이스의 디바이스ID  | 항상|
| deviceType | int| 요청하는 디바이스의 디바이스 타입  | 항상|
| irDeviceId | int| 요청하는 디바이스의 IR 디바이스 아이디  | 항상|


#### 응답 본문
응답 본문 형식은 JSON 형태로 제공되며 요청 결과 값과 리모컨 형식, 그리고 리모컨 형식에 따라 KeyObject배열 또는 KeyRangeObject 배열로 구성된다.

````JSON
{
    "status":0,
    "type":1,
    "keyList":[        
        {
            "fid":1,
            "fkey":"power",
            "fname":"POWER",                    
        },
        {
            "fid":2,
            "fkey":"ok",
            "fname":"OK",                    
        },
    ],     
}
````
| 필드이름  | 자료형| 필드 설명| 필수/포함 여부|
| ---------- | ----|---------|----------- |
| status | int| 요청 결과 값   | 필수/항상|
| type | int| 리모컨 형식 (0:일반, 1:조합형)   | 선택/조건부|
| keyList[] | KeyObject array| 디바이스가 지원하는 리모컨 키 객체 배열 (일반 리모컨 형식)  | 선택/조건부|
| keyList[] | KeyObject array| 디바이스가 지원하는 리모컨 키 객체 배열 (일반 리모컨 형식)  | 선택/조건부|




## 디바이스 상태 조회
### queryDeviceStatus
디바이스의 상태를 조회 하는 API 입니다. 등록된 디바이스의 상태를 조회하려면, 조회하려는 디바이스의 정보가 필요합니다.

#### 요청 헤더
````http
POST /smarthome/queryDeviceStatus HTTP/1.1
Host: open.hknetworks.kr
Content-Type: application/json;charset-UTF-8
Content-Length: **
````
#### 요청 본문
사용자의 디바이스 목록을 요청하려면 사용자의 계정정보를 메시지 본문에 JSON 형태로 아래와 같이 전달하여야 합니다.
````JSON
{
    "userid":"testUser",
    "password":"******",  
    "mac":"5ccf7fcc0f83",
    "deviceId":"369ab1a4e6d54f63adfb593e6765a8c7",    
}
````
| 필드이름  | 자료형| 필드 설명| 필수/포함 여부|
| ---------- | ----|---------|----------- |
| userid | string| 요청하는 사용자의 HK스마트홈 사용자 아이디  | 필수/항상|
| password | string| 요청하는 사용자의 HK스마트홈 사용자 패스워드  | 필수/항상|
| mac | string| 요청하는 디바이스의 Mac Address  | 필수/항상|
| deviceId | string| 요청하는 디바이스의 디바이스ID  | 필수/항상|

#### 응답 본문
응답 본문 형식은 JSON 형태로 제공되며 요청 결과 값과 디바이스 상태 정보로 구성된다.

````JSON
{
    "status":0,
    "mac":"5ccf7fcc0f83",
    "deviceId":"369ab1a4e6d54f63adfb593e6765a8c7",
    "deviceStatus":0,
    "online":1,
}
````
| 필드이름  | 자료형| 필드 설명| 포함 여부|
| ---------- | ----|---------|----------- |
| status | int| 요청 결과 값   | 항상|
| mac | string| 요청받은 디바이스의 Mac Address  | 필수/항상|
| deviceId | string| 요청받은 디바이스의 디바이스ID  | 필수/항상|
| deviceStatus | int| 요청받은 디바이스가 스마트플러그 타입일 경우 (0:On, 1:Off), 이외의 경우는 0  | 필수/항상|
| online | int| 요청받은 디바이스의 온라인 여부(0:offline, 1:online)  | 필수/항상|

### queryDeviceStatusAll
사용자 계정의 등록된 모든 디바이스의 상태를 조회 하는 API 입니다. 

#### 요청 헤더
````http
POST /smarthome/queryDeviceStatusAll HTTP/1.1
Host: open.hknetworks.kr
Content-Type: application/json;charset-UTF-8
Content-Length: **
````
#### 요청 본문
사용자의 디바이스 목록을 요청하려면 사용자의 계정정보를 메시지 본문에 JSON 형태로 아래와 같이 전달하여야 합니다.
````JSON
{
    "userid":"testUser",
    "password":"******",      
}
````
| 필드이름  | 자료형| 필드 설명| 필수/포함 여부|
| ---------- | ----|---------|----------- |
| userid | string| 요청하는 사용자의 HK스마트홈 사용자 아이디  | 필수/항상|
| password | string| 요청하는 사용자의 HK스마트홈 사용자 패스워드  | 필수/항상|

#### 응답 본문
응답 본문 형식은 JSON 형태로 제공되며 요청 결과 값과 디바이스 상태정보를 나타내는 deviceStatusObject 배열로 구성된다.

````JSON
{
    "status":0,
    "statusList":[
        {
            "mac":"5ccf7fcc0f83",
            "deviceId":"369ab1a4e6d54f63adfb593e6765a8c7",
            "deviceStatus":0,
            "online":1,
        }
    ]    
}
````
| 필드이름  | 자료형| 필드 설명| 필수/포함 여부|
| ---------- | ----|---------|----------- |
| status | int| 요청 결과 값   | 필수/항상|
| statusList | deviceStatusObject Array| 등록된 디바이스별 상태정보 배열  | 필수/항상|


## 디바이스 제어
### controlDevice
선택된 디바이스를 제어하는 API 입니다. 제어 형식은 스마트플러그의(S플러그:SP30A) 경우 turnon, turnoff 명령을 지원하고 IR허브(mBox:mb50a)의 경우 ir, airir, aircompir 명령을 지원합니다.

#### 요청 헤더
````http
POST /smarthome/controlDevice HTTP/1.1
Host: open.hknetworks.kr
Content-Type: application/json;charset-UTF-8
Content-Length: **
````
#### 요청 본문
사용자의 디바이스 목록을 요청하려면 사용자의 계정정보를 메시지 본문에 JSON 형태로 아래와 같이 전달하여야 합니다.
````JSON
{
    "userid":"testUser",
    "password":"******",
    "mac":"5ccf7fcc0f83",
    "deviceId":"369ab1a4e6d54f63adfb593e6765a8c7",
    "command":
    {
        "type":"turnon",
        "parameter":
        {
            "fid":1,
            "repeat":1,
            "power": 0,
            "mode": 0,
            "temp": 26,
            "speed": 0,
            "direct": 0,
            "keyid": 4,


        }
    }
    
}
````
| 필드이름  | 자료형| 필드 설명| 필수/포함 여부|
| ---------- | ----|---------|----------- |
| userid | string| 요청하는 사용자의 HK스마트홈 사용자 아이디  | 필수/항상|
| password | string| 요청하는 사용자의 HK스마트홈 사용자 패스워드  | 필수/항상|
| mac | string| 요청하는 디바이스의 Mac Address  | 필수/항상|
| deviceId | string| 요청하는 디바이스의 디바이스ID  | 필수/항상|
| type | string| 제어 명령 <br>- turnon, turnoff(스마트플러그만 해당)<br>- ir(일반리모컨,에어컨 제외)<br>- airir(에어컨 일반 리모콘)<br>- aircompir(에어컨 조합형 리모컨)| 필수/항상|
| parameter | object | 명령 파라메터 turnon, turnoff 명령의 경우 사용하지 않음  | 선택/조건부|
| fid | int | 전송을 원하는 Key 인덱스값(ir, airir 명령에만 사용)  | 선택/조건부|
| repeat | int | 전송을 원하는 Key 인덱스값(ir, airir 명령에만 사용)  | 선택/조건부|
| power | int | 전원 상태(aircompir 명령에만 사용)<br> power on: 0, power off: 1  | 선택/조건부|
| mode | int | 에어컨 모드(aircompir 명령에만 사용)<br>Cooling: 0, Heating: 1, Automatic: 2, Blast: 3, Dehumidification: 4   | 선택/조건부|
| temp | int | 온도 설정(aircompir 명령에만 사용)<br>온도 설정이 필요 없는 경우 -1   | 선택/조건부|
| speed | int | 전원 상태(aircompir 명령에만 사용)   | 선택/조건부|
| direct | int | 전원 상태(aircompir 명령에만 사용)   | 선택/조건부|
| keyid | int | main key(aircompir 명령에만 사용)<br>power:1, mode:2, temperature+:3 temperature-:4,<br> air volume:5, Automatic blade swing:6, stop blade swing:7   | 선택/조건부|



#### 응답 본문
응답 본문 형식은 JSON 형태로 제공되며 요청 결과 값으로 구성된다.

````JSON
{
    "status":0,
    "msg":"success",
}
````
| 필드이름  | 자료형| 필드 설명| 필수/포함 여부|
| ---------- | ----|---------|----------- |
| status | int| 요청 결과 값   | 필수/항상|
| msg | String| 결과값에 대한 설멍  | 필수/항상|





