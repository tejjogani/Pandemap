from django.conf import settings
from django.core.management.base import BaseCommand
import sys

class Command(BaseCommand):

    args = ''
    help = 'Django deployment script - IBM Cloud'

    def add_arguments(self, parser):

        parser.add_argument('application_name', type=str)

    def handle(self, *args, **options):

        check = "Project successfully configured for: %s"
        application_name = options['application_name']
        base = settings.BASE_DIR
        python_version = sys.version.split(' ')[0]
        project_name = settings.WSGI_APPLICATION.split(".")[0]

        try:
            f = open(base + "/Procfile", "w")
            f.write("web: python manage.py migrate && gunicorn {}.wsgi --log-file -".format(project_name))
            f.close()

        except IOError as e:
            check = "Exception at creating Procfile :"
            print ("failed to create Procfile {}".format(e))

        try:
            m = open(base + "/manifest.yml", "w")
            m.write(" applications: \n  - name: {} ".format(application_name))
            m.close()

        except IOError as e:
            check = "Exception at creating manifest.yml"
            print ("failed to create manifest.yml - {}".format(e))

        try:
            v = open(base + "/runtime.txt", "w")
            v.write("python-{}".format(python_version))
            v.close()

        except IOError as e:
            check = "Exception at creating runtime.txt"
            print ("failed to create runtime.txt - {}".format(e))

        self.stdout.write(check % str(application_name))