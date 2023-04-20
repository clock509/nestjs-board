# nestjs-board
'따라하면서 배우는 NestJS' 강의를 들으며 만든 게시판 서비스 입니다(강좌 URL: https://www.youtube.com/watch?v=3JminDpCJNE).

# 기능
1. 게시물 CRUD
2. 인증 기능
   1. 회원가입
   2. 패스워드 암호화
   3. 로그인
   4. JWT와 Passport를 이용한 토큰 생성, 토큰을 통한 인증


# 기술 stack
- server: [Nest.js](https://docs.nestjs.com/)
- database: MySQL(강의에서는 PostgreSQL을 사용하지만, 개인적으로 평소에 자주 사용했던 것으로 변경했습니다)
- ORM: [TypeORM](https://typeorm.io/)

# 주요한 NestJS 기능

## 1. Module
![](https://docs.nestjs.com/assets/Modules_1.png)
- 밀접하게 관련된 기능들의 집합. 특정한 기능이나 엔티티를 중심으로 하여 여러 기능들을 '모듈'이라는 하나의 집합체로 묶음으로서 응집도를 높일 수 있다.
- 각 모듈은 하위 Provider, Controller, Entity, Service, Repository, ValidationPipe를 가진다.
- NestJS 애플리케이션은 최소한 하나의 모듈을 가지는데, 이것은 Application Module이며 곧 최상위(root) 모듈이다. 즉, <b>Application Module은 application graph를 그리는 시작점</b>이다.


![](https://docs.nestjs.com/assets/Shared_Module_1.png)
- 하나의 모듈은 <b>싱글톤</b>이므로, 모든 모듈 간에 provider instance 를 서로 쉽게 공유하여 재사용할 수 있다.

```
$ nest g module boards 
```
## 2. Controller
- 들어오는 요청을 처리하고, 클라이언트에 반환하는 부분.
```
$ nest g controller boards

# cli는 먼저 프로젝트에서 boards 디렉터리를 찾은 후,
# boards 폴더 안에 controller 파일을 생성(boards.controller.ts)한다.
# 그 후 boards 디렉터리 안에서 module을 찾아,
# module class의 metadata에 controller를 등록해 준다. 
```

## 3. Service
- 주 기능
  - 데이터의 유효성을 체크한다.
  - 비즈니스 로직을 처리하며, 이 로직에 필요한 데이터를 데이터베이스에 접근하여 가져오거나, 저장한다.
- service에는 `@Injectable()` 이라는 데코레이터가 붙어있다. 이 데코레이터를 통해 다른 컴포넌트에서 이 서비스를 사용할 수 있게 된다.
  - 특히, Controller 클래스의 Constructor 안에서 service를 이용하는 것을 `Dependency Injection`이라고 한다.
- Service 인스턴스는 애플리케이션 전체에서 사용될 수 있다.
 ```
$ nest g service boards

# cli는 먼저 프로젝트에서 boards 디렉터리를 찾은 후,
# boards 폴더 안에 service 파일을 생성(boards.service.ts)한다.
# 그 후 boards 디렉터리 안에서 module을 찾아,
# module class의 metadata에 provider에 service를 등록해 준다. 
```

## 4. Provider
- 종속성으로 주입되는 NestJS의 기본 클래스(Service, Repository, Factory, Helper 등)를 의미한다.
- 주입됨으로써 객체는 서로 다양한 관계를 만들 수 있으며, NestJS 런타임 시스템에 의해 객체의 인스턴스는 서로 연결된다.
  - (ex) Controller가 필요로 하는 다양한 기능들을 Controller 안에서 다 구현할 수 없다. 해당 기능들은 별개의 파일에서 구현한 다음, Controller에 `주입`함으로써 Controller가 기능을 사용할 수 있게 해 주는 것이다. 

## DTO(Data Transfer Object)
- 계층 간 데이터 교환을 위한 객체로서, DB에서 데이터를 얻어 Service나 Controller 등으로 보낼 때 사용하는 객체.
- 데이터가 네트워크를 통해 전송되는 방법을 정의하는 객체이다.
- interface나 class를 이용해서 정의될 수 있다. 이 중에서도 class를 이용하는 것을 추천한다([공식문서 참조](https://docs.nestjs.com/controllers#request-payloads)).
  - class: ES6 표준의 일부이므로, 자바스크립트 컴파일 시 실제 객체(entity)로 보존된다.
  - interface: transpilation 과정에서 제거되므로, NestJS가 런타임에서 참조할 수 없게 된다. 
- <b>데이터 유효성</b>을 체크하는 데 효율적이다.

## Pipes


## Entity


## Repository


## Custom Decorator


# 