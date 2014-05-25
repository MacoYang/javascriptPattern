function step1(data_key, result_callback){

    var targets = ['Ů����','������','����','����','����'];

    var warpper = $('<ul></ul>')

    $.each(targets, function(k,v){

        $('<li>'+v+'</li>').click(function(){result_callback(v)}).appendTo(warpper);

    });

    return ['��һ��:��ѡ��������Ķ���',warpper];

}

function step2(data_key, result_callback){

    var tags = {

        'Ů����':['����','�ɰ�','����','����','ʵ��','����',

                '����','ë�����','�·�','����'],

        '������':['��ʿ��Ʒ','��ܰ','ʵ��','����','����','����'],

        '����'  :['��ʿ��Ʒ','����','ֲ��','����'],

        '����'  :['��ܰ','����','����','����Ʒ','ʵ��'],

        '����'  :['���','ѧϰ��Ʒ','ʵ��','����']

    };

    var warpper = $('<ul></ul>')

    $.each(tags[data_key], function(k,v){

        $('<li>'+v+'</li>').click(function(){result_callback(v)}).appendTo(warpper);

    });

    return ['�ڶ���:��ѡ��ؼ���',warpper];  

}

function step3(data_key, result_callback){

    var price_level = ['����','��ͨ','�Թ�','����'];

    var warpper = $('<ul></ul>')

    $.each(price_level, function(k,v){

        $('<li>'+v+'</li>').click(function(){result_callback(v)}).appendTo(warpper);

    });

    return ['������:��ѡ��۸�����',warpper];

}
function Wizard(container, steps, callback){

    this.container = container; //������

    this.steps = steps;         //�򵼲���

    this.callback = callback;   //��ִ�����ִ�еĻص�

    this.collect_data = [];     //������ÿһ����Ľ��

    this.index = 0;            //��ǰִ������һ����
    this.length = steps.length;

}

//����ĳһ����

Wizard.prototype.render = function(step, this_result){

    var me = this;

    //ִ�иò��貢�õ��ò����UI

    var to_append = step(this_result,function(result){

        me.collect_data.push(result); //�ռ���������

        //��ִ�����ʱ���ûص�����������ִ����һ��

        if(me.collect_data.length == me.steps.length)

            me.callback(me.collect_data);

        else

            me.next(result);

    });

    //���Ʊ������UI

    this.container.empty();

    this.container.append("<h2>"+to_append[0]+"</h2>");

    this.container.append(to_append[1]);

    if(this.index == 0){

        //���˰�ť

        this.container.append($("<div class='bar'><a href='javascript:;'>ǰ��</a></div>")

            .click(function(){me.next()}

                ));

    }else if (this.index>0&&this.index<this.length-1){

        this.container.append($("<div class='bar'><a href='javascript:;'>����</a></div>")

            .click(function(){me.back()}

                ));
        this.container.append($("<div class='bar'><a href='javascript:;'>ǰ��</a></div>")

            .click(function(){me.next()}

                ));
	}
	else if(this.index==this.length-1){

        this.container.append($("<div class='bar'><a href='javascript:;'>����</a></div>")

            .click(function(){me.back()}

                ));
	}else{
		alert("wrong");
	}
}

//ִ����һ��

Wizard.prototype.next = function(this_result){

    if(this.index >= this.steps.length -1)

        return;

    var step = this.steps[++this.index];

    this.render(step,this_result);

}

//���˵���һ��

Wizard.prototype.back = function(){

    if(this.index <= 0)

        return;

    var step = this.steps[--this.index];

    //����ص���һ��������һ����������Ҫ����һ���Ľ��������

    this.collect_data = this.collect_data.slice(0, this.index);

    this.render(step, this.collect_data[this.index - 1]);

}

