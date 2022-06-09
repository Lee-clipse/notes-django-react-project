from urllib import response
from django.shortcuts import render
# for Response()
from rest_framework.response import Response
# for GET or POST routing
from rest_framework.decorators import api_view
# for send data of model
from .models import Note
# for serialize list obj of python to render data
from .serializers import NoteSerializer


# "/"
@api_view(['GET'])
def getRoutes(request): 

    # this send to Response param
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]

    # rendering 'routes' to browse
    return Response(routes)


# "/notes/"
@api_view(['GET'])
def getNotes(request):
    # this python obj list need Serializer
    # my models.py have 'update' attribute and order by that
    notes = Note.objects.all().order_by('-update')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


# "/notes/"
@api_view(['GET'])
def getNote(request, pk):
    # get sigle Note obj what id == pk
    notes = Note.objects.get(id=pk)
    serializer = NoteSerializer(notes, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateNote(request, pk):
    # take data and update it to note
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted!')