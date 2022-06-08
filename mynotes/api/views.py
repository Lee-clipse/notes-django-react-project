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
    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


# "/notes/"
@api_view(['GET'])
def getNote(request, pk):
    # get sigle Note obj what id == pk
    notes = Note.objects.get(id=pk)
    serializer = NoteSerializer(notes, many=False)
    return Response(serializer.data)