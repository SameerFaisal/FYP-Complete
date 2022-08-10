
from importlib.util import resolve_name
from msilib.schema import Control
from urllib import response
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from django.conf import settings
import os
from rest_framework.decorators import api_view
import json
from pprint import pprint
from .models import Project, Screens, Controls
from .serializers import ProjectSerializers,ScreenSerializers, ControlSerializers
from .corelogic import ProVision, VisionStatement, WireFrame, OneScreenWireframe
from django.http import JsonResponse

from api import serializers

data = []

@api_view(['GET'])
def insertview(request,pk):
    dic = {}
    screentitle = {}
    buttonsjson = {}
    controlsdic = {}
    projects = Project.objects.get(id=pk)
    screens = Screens.objects.filter(projectID=pk)

    projects = Project.objects.get(id=pk)
    screen = Screens.objects.filter(projectID=pk)
    pro_serializer = ProjectSerializers(projects, many=False) 
    scr_serializer = ScreenSerializers(screen, many=True) 
    dic['TITLE'] = pro_serializer.data['projectTitle']
    count = 0
    for i in scr_serializer.data:
        textboxes, radiobuttons, comboboxes, datepicker, checkboxes, buttons = [],[],[],[],[],[]
        screentitle['Screen'+str(int(count+1))] = i['screenTitle']
        controls = Controls.objects.filter(screenID=i['id'])
        con_serializers = ControlSerializers(controls, many=True)
        for j in con_serializers.data:
            controlsdic['Screen'+str(int(count+1))] = {}
            if(j['controlsType'] == 'TextBoxes'):
                textboxes.append(j['controlTitle'])
            elif(j['controlsType'] == 'RadioButtons'):
                radiobuttons.append(j['controlTitle'])
            elif(j['controlsType'] == 'ComboBoxes'):
                comboboxes.append(j['controlTitle'])
            elif(j['controlsType'] == 'DatePicker'):
                print(datepicker)
                datepicker.append(j['controlTitle'])  
                print(datepicker)

            elif(j['controlsType'] == 'CheckBoxes'):
                checkboxes.append(j['controlTitle'])
            elif(j['controlsType'] == 'BUTTONS'):
                buttons.append(j['controlTitle'])
        if(len(textboxes) > 0 ):
            controlsdic['Screen'+str(int(count+1))]['TextBoxes'] = textboxes
        if(len(radiobuttons) > 0 ):
            controlsdic['Screen'+str(int(count+1))]['RadioButtons'] = radiobuttons
        if(len(comboboxes) > 0 ):
            controlsdic['Screen'+str(int(count+1))]['ComboBoxes'] = comboboxes
        if(len(datepicker) > 0 ):
            controlsdic['Screen'+str(int(count+1))]['DatePicker'] = datepicker
        buttonsjson['Screen'+str(int(count+1))]=buttons
        count +=1
    dic['NOOFSCREENS'] = count
    dic['SCREENS'] = screentitle
    dic['BUTTONS'] = buttonsjson
    data[0] = dic
    return JsonResponse(json.dumps(dic), safe=False)
@api_view(['GET'])
def controls(request,pk):
    dic = {}
    screentitle = {}
    buttonsjson = {}
    controlsdic = {}
    projects = Project.objects.get(id=pk)
    screens = Screens.objects.filter(projectID=pk)

    projects = Project.objects.get(id=pk)
    screen = Screens.objects.filter(projectID=pk)
    pro_serializer = ProjectSerializers(projects, many=False) 
    scr_serializer = ScreenSerializers(screen, many=True) 
    dic['TITLE'] = pro_serializer.data['projectTitle']
    count = 0
    for i in scr_serializer.data:
        textboxes, radiobuttons, comboboxes, datepicker, checkboxes, buttons = [],[],[],[],[],[]
        screentitle['Screen'+str(int(count+1))] = i['screenTitle']
        controls = Controls.objects.filter(screenID=i['id'])
        con_serializers = ControlSerializers(controls, many=True)
        for j in con_serializers.data:
            controlsdic['Screen'+str(int(count+1))] = {}
            if(j['controlsType'] == 'TextBoxes'):
                textboxes.append(j['controlTitle'])
            elif(j['controlsType'] == 'RadioButtons'):
                radiobuttons.append(j['controlTitle'])
            elif(j['controlsType'] == 'ComboBoxes'):
                comboboxes.append(j['controlTitle'])
            elif(j['controlsType'] == 'DatePicker'):
                print(datepicker)
                datepicker.append(j['controlTitle'])  
                print(datepicker)

            elif(j['controlsType'] == 'CheckBoxes'):
                checkboxes.append(j['controlTitle'])
            elif(j['controlsType'] == 'BUTTONS'):
                buttons.append(j['controlTitle'])
        if(len(textboxes) > 0 ):
            controlsdic['Screen'+str(int(count+1))]['TextBoxes'] = textboxes
        if(len(radiobuttons) > 0 ):
            controlsdic['Screen'+str(int(count+1))]['RadioButtons'] = radiobuttons
        if(len(comboboxes) > 0 ):
            controlsdic['Screen'+str(int(count+1))]['ComboBoxes'] = comboboxes
        if(len(datepicker) > 0 ):
            controlsdic['Screen'+str(int(count+1))]['DatePicker'] = datepicker
        buttonsjson['Screen'+str(int(count+1))]=buttons
        

        
        
        
        count +=1
    
    dic['SCREENS'] = screentitle
    dic['BUTTONS'] = buttonsjson
    data.append(dic)
    data.append(controlsdic)

    return JsonResponse(json.dumps(controlsdic), safe=False)
   

@api_view(['POST', 'GET'])
def insert(request):
    response = {}
    if request.method == 'POST':
        print("heloo")
        userstory = request.data['userstory']
        method = request.data['method']
        print(method)
        print(userstory)
        if(method == 'userstory'):
            a = ProVision(userstory)
        else:
            a = VisionStatement(userstory)       
        
        if a.errormsg == True:
            
            screendetails, controldetails = a.main()
            print(type(screendetails))
            data.append(screendetails)
            data.append(controldetails)
            print("data insert")
            print(data)
            
            print(json.dumps(controldetails))
            response['status'] = True
        else:
            print("error")
            print(a.errorjson)
            response["error"] = a.errormsg
            response["status"] = False

        return JsonResponse(json.dumps(response), safe=False)

@api_view(['GET'])
def getproject(request):
    projects = Project.objects.all()
    serializer = ProjectSerializers(projects, many=True)
    return Response(serializer.data)

def get_screens(request):
    jsondata = json.dumps(data[0])
    print(jsondata)
    return JsonResponse(jsondata, safe=False)

def get_controls(request):
    jsondata = json.dumps(data[1])
    print(jsondata)
    return JsonResponse(jsondata, safe=False)


@api_view(['POST', 'GET'])
def get_wireframe(request):
    if "projectID" in request.data:
        projectID = request.data['projectID']
        project = Project.objects.get(id=projectID)
        project.delete()
    print("data update")
    print(data)
    projecttitle = data[0]['TITLE']
    print('Wire Frame')
    screendetails  = request.data['screendetails']
    print(screendetails)
    p = Project.objects.create( projectTitle=projecttitle,projectCategory="Hello")
    for i in screendetails:            
        s= Screens.objects.create(screenTitle=screendetails[i]['title'],projectID=p)
        for j in screendetails[i]:
            if(j !='title'):
                for k in screendetails[i][j]:
                    print(k,i)
                    Controls.objects.create(controlTitle=k,controlsType=j,screenID=s)


    a = WireFrame(screendetails,projecttitle)
    print(screendetails)
    boolvalue = a.main()
    
    return HttpResponse(screendetails,data)



@api_view(['POST','GET'])
def onescreengenrate(request):
    print(request.data['onescreen'])
    a = OneScreenWireframe(request.data['onescreen'])
    a.main()
    return HttpResponse("True")
