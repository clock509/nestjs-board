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
  - 삭제 관련 기능: `remove()` VS `delete()`([공식 문서 참조하기](https://github.com/typeorm/typeorm/blob/master/docs/repository-api.md))
    - `remove()`: 반드시 존재하는 데이터를 삭제할 때만 사용해야 한다. 존재하지 않는 데이터를 삭제하려 하면 `404 Error`가 발생한다.
    - `delete()`: 데이터가 존재하면 지우고, 존재하지 않으면 아무런 영향이 없다.
    - 즉, <b>성능의 관점</b>에서 `remove()`는 하나의 데이터를 지우기 위해 두 번 데이터베이스에 접근((1) 데이터 존재 여부 확인 -> (2) 삭제)해야 하므로, 성능이 중요하다면 한 번만 접근해도 되는 `delete()` 메서드를 권장한다. 

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
- Pipe는 `@Injectable()` 데코레이터로 주석이 달린 클래스이다.
- 파이프는 `data transformation`과 `data validation`을 위해서 사용된다.
  - `data transformation`: request의 입력 데이터를 원하는 형식으로 자동으로 변환한다(ex. 문자열 -> 정수)
  - `data validation`: request의 입력 데이터를 평가하고, 유효성 체크를 하여 유효한 경우 변경되지 않은 상태로 전달하고, 그렇지 않으면 예외를 발생시킨다.
- 컨트롤러 경로 처리기에 의해 처리되는 인수에 대해 작동한다.
- Nest는 메소드가 호출되기 직전에 파이프를 삽입하고, 파이프는 메소드로 향하는 인수를 수신하고 이에 대해 작동한다.

### Pipe가 작동하는 경우
- Route handler가 처리하는 인수에 대해 작동
- Pipe는 메소드 바로 직전에 작동해서, 메소드로 향하는 인수에 대해 변환할 것이 있으면 변환하고, 유효성 체크를 위해 호출되기도 한다. 

### Pipe를 사용하는 방법(Binding pipes)
1. Handler-level pipes
   1. Route handler(=Controller)에서 `@UsePipes()` 데코레이터를 이용해서 할 수 있다.
   2. 이 파이프는 <b>모든 파라미터</b>에 적용된다.
2. Parameter-level pipes
   1. <b>특정한 파라미터</b>에게만 적용이 되는 파이프이다.
3. Global-level pipes
   1. 클라이언트에서 들어오는 모든 요청에 적용된다.
   2. 가장 상단 영역인 `main.ts`에 적용한다.

### Build-in pipes
1. ValidationPipe
2. ParseIntPipe
3. ParseBoolPipe
4. ParseArrayPipe
5. ParseUUIDPipe
6. DefaultValuePipe

필요한 경우 Custom pipe를 만들 수 있다.

### 필요한 라이브러리
```
$ npm isntall class-validator class-transformer
# 각각 유효성 체크, 자료형 변환에 사용된다.
```

## Entity


## Repository
- 강좌에서 사용하는 `@EntityRepository()`는 typeorm 0.3.x에서 deprecated 되었다.
- 따라서 [이 블로그](https://velog.io/@wonjun1995/NestJS9.x.x-TypeORM0.3.x%EC%97%90%EC%84%9C-customRepository-%EC%89%BD%EA%B2%8C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)를 참조해서 Custom repository를 사용한다.


## Custom Decorator


# 