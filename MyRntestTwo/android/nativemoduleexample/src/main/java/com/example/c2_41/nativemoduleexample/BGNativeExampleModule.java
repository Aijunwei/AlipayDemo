package com.example.c2_41.nativemoduleexample;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;


/**
 * Created by C2-41 on 2016/6/3.
 */

public class BGNativeExampleModule extends ReactContextBaseJavaModule{
    private Timer timer;
    public BGNativeExampleModule(final ReactApplicationContext reactContext){
        super(reactContext);
        TimerTask task = new TimerTask(){
          @Override
          public void run(){
              WritableMap  params = Arguments.createMap();
              params.putString("name", "Jack");
              reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("TestEventName",params);
          }
        };
        timer= new Timer();
        timer.schedule(task,1000,1000);
    }
    @Override
    public String getName(){
        return "BGNativeModuleExample";
    }

    @ReactMethod
    public void testPrint(String name, ReadableMap info){
        Log.i("TAG",name);
        Log.i("TAG",info.toString());
    }

    @ReactMethod
    public void getNativeName(Callback callback){
        callback.invoke("BGNativeExampleModile");
    }

    @ReactMethod
    public void testPromises(Boolean isResolve,Promise promise){
        if(isResolve){
            promise.resolve(isResolve.toString());
        }else{
            promise.reject(isResolve.toString());
        }
    }

    @Override
    public Map<String,Object> getConstants(){
        final Map<String, Object> constants = new HashMap<>();
        constants.put("BGModuleName","BGNativeModuleExample");
        constants.put("TestEventName","TestEventName");
        return constants;
    }
}
