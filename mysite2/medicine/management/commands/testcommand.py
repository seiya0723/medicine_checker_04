from django.core.management.base import BaseCommand

from ...models import Medicine

class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        print("これでコマンドが実行できる。")
        medicines   = Medicine.objects.all()
        print(medicines)

        for medicine in medicines:
            print(medicine.id         )
            print(medicine.name       )
            print(medicine.dt         )
            print(medicine.effect     )
            print(medicine.caution    )
            print(medicine.dosage     )
            print(medicine.side_effect)
