from django.db import models

class Note(models.Model):
    # null & blank: can submit to db what value is null or blank
    body = models.TextField(null=True, blank=True)

    # auto_now: add timestamp when we update to db
    update = models.DateTimeField(auto_now=True)

    # auto_now_add: add timestamp when we create db
    created = models.DateTimeField(auto_now_add=True)

    # view fist 50 characters because of clean view
    def __str__(self):
        return self.body[0:50]
