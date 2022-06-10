from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer


'''
/notes        GET       getNotesList()
/notes        POST      createNote()
/notes/<id>   GET       getNote()
/notes/<id>   PUT       udpateNote()
/notes/<id>   DELETE    deleteNote()
'''


# "/notes GET"
def getNotesList(request):
    notes = Note.objects.all().order_by('-update')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


# /notes POST
def createNote(request):
    data = request.data
    note = Note.objects.create(
        body = data['body']
    )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)


# /notes/<id> GET
def getNoteDetail(request, pk):
    notes = Note.objects.get(id=pk)
    serializer = NoteSerializer(notes, many=False)
    return Response(serializer.data)


# /notes/<id> PUT 
def updateNote(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)
    if serializer.is_valid():
            serializer.save()
    return Response(serializer.data)


# /notes/<id> DELETE
def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted!')