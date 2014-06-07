import json
class Serializable(object):
  def __init__(self):
    self.__type__ = self.__class__.__name__

  def toJson(self):
    return json.dumps(self, default=lambda o: o.__dict__)

  def fromJson(self,blob):
    obj = json.loads(blob)
    if '__type__' in obj and obj['__type__'] == self.__class__.__name__:
        self.__dict__ = obj
        return self
    return obj

 