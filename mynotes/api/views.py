from rest_framework.decorators import api_view
from .utils import *


'''
/notes        GET       getNotesList()
/notes        POST      createNote()
/notes/<id>   GET       getNote()
/notes/<id>   PUT       udpateNote()
/notes/<id>   DELETE    deleteNote()
'''

# /notes/
@api_view(['GET', 'POST'])
def getNotes(request):
    if request.method == 'GET':
        return getNotesList(request)

    if request.method == 'POST':
        return createNote(request)


# /notes/<id>
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def getNote(request, pk):
    if request.method == 'GET':
        return getNoteDetail(request, pk)
    
    if request.method == 'PUT':
        return updateNote(request, pk)

    if request.method == 'DELETE':
        return deleteNote(request, pk)
