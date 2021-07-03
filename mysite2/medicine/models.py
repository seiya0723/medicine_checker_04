from django.db import models
from django.utils import timezone

import uuid

class Medicine(models.Model):

    class Meta:
        db_table = "medicine"

    id          = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name        = models.CharField(verbose_name="医薬品名",max_length=100)
    dt          = models.DateTimeField(verbose_name="登録日",default=timezone.now)
    effect      = models.TextField(verbose_name="作用と効果",blank=True)
    caution     = models.TextField(verbose_name="使用上の注意",blank=True)
    dosage      = models.TextField(verbose_name="用法・用量",blank=True)
    side_effect = models.TextField(verbose_name="副作用",blank=True)

    def __str__(self):
        return self.name




